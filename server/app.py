from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import datetime, timedelta
import os

from models import db, bcrypt, User, Table, Booking, Waitlist, LoyaltyPoint, Review

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
bcrypt.init_app(app)
CORS(app)


# Health Check

@app.route("/api/health")
def health_check():
    return jsonify({"status": "Backend is running"})


# Auth Routes

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"success": False, "message": "All fields are required"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"success": False, "message": "An account with this email already exists"}), 409

    new_user = User(name=name, email=email, role="customer")
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success": True, "user": new_user.to_dict()}), 201


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

    return jsonify({"success": True, "user": user.to_dict()}), 200


# Table Routes

@app.route("/api/tables", methods=["GET"])
def get_tables():
    tables = Table.query.all()
    return jsonify([table.to_dict() for table in tables]), 200


@app.route("/api/tables/seed", methods=["POST"])
def seed_tables():
    existing = Table.query.first()
    if existing:
        return jsonify({"success": False, "message": "Tables already exist"}), 409

    default_tables = [
        {"number": 1, "capacity": 2, "location": "Window Side"},
        {"number": 2, "capacity": 2, "location": "Window Side"},
        {"number": 3, "capacity": 4, "location": "Main Hall"},
        {"number": 4, "capacity": 4, "location": "Main Hall"},
        {"number": 5, "capacity": 6, "location": "Garden Area"},
        {"number": 6, "capacity": 8, "location": "Private Corner"},
    ]

    for t in default_tables:
        new_table = Table(number=t["number"], capacity=t["capacity"], location=t["location"])
        db.session.add(new_table)

    db.session.commit()

    return jsonify({"success": True, "message": "Tables seeded"}), 201


# Booking Routes

@app.route("/api/bookings", methods=["GET"])
def get_all_bookings():
    bookings = Booking.query.filter_by(status="confirmed").all()
    return jsonify([b.to_dict() for b in bookings]), 200


@app.route("/api/bookings/available", methods=["GET"])
def get_available_tables():
    date = request.args.get("date")
    time = request.args.get("time")

    if not date or not time:
        return jsonify({"success": False, "message": "Date and time are required"}), 400

    try:
        requested_start = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")
    except ValueError:
        return jsonify({"success": False, "message": "Invalid date or time format"}), 400

    requested_end = requested_start + timedelta(minutes=90)

    all_bookings = Booking.query.filter_by(date=date, status="confirmed").all()

    booked_table_ids = []
    for b in all_bookings:
        existing_start = datetime.strptime(f"{b.date} {b.time}", "%Y-%m-%d %H:%M")
        existing_end = existing_start + timedelta(minutes=b.duration_minutes)

        if requested_start < existing_end and requested_end > existing_start:
            booked_table_ids.append(b.table_id)

    all_tables = Table.query.all()
    available = [t.to_dict() for t in all_tables if t.id not in booked_table_ids]

    return jsonify(available), 200


@app.route("/api/bookings", methods=["POST"])
def create_booking():
    data = request.get_json()

    table_id = data.get("tableId")
    user_id = data.get("userId")
    name = data.get("name")
    phone = data.get("phone")
    date = data.get("date")
    time = data.get("time")
    guests = data.get("guests")
    notes = data.get("notes", "")

    if not all([table_id, user_id, name, phone, date, time, guests]):
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    requested_start = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")
    requested_end = requested_start + timedelta(minutes=90)

    existing_bookings = Booking.query.filter_by(table_id=table_id, date=date, status="confirmed").all()

    for b in existing_bookings:
        existing_start = datetime.strptime(f"{b.date} {b.time}", "%Y-%m-%d %H:%M")
        existing_end = existing_start + timedelta(minutes=b.duration_minutes)

        if requested_start < existing_end and requested_end > existing_start:
            return jsonify({"success": False, "message": "This table is already booked for that time"}), 409

    new_booking = Booking(
        table_id=table_id,
        user_id=user_id,
        name=name,
        phone=phone,
        date=date,
        time=time,
        guests=guests,
        notes=notes,
        status="confirmed",
    )

    db.session.add(new_booking)
    db.session.commit()

    return jsonify({"success": True, "booking": new_booking.to_dict()}), 201


@app.route("/api/bookings/user/<int:user_id>", methods=["GET"])
def get_user_bookings(user_id):
    bookings = Booking.query.filter_by(user_id=user_id, status="confirmed").all()
    return jsonify([b.to_dict() for b in bookings]), 200


@app.route("/api/bookings/<int:booking_id>/cancel", methods=["PATCH"])
def cancel_booking(booking_id):
    booking = Booking.query.get(booking_id)

    if not booking:
        return jsonify({"success": False, "message": "Booking not found"}), 404

    booking.status = "cancelled"
    db.session.commit()

    return jsonify({"success": True, "message": "Booking cancelled"}), 200


# Waitlist Routes

@app.route("/api/waitlist", methods=["POST"])
def join_waitlist():
    data = request.get_json()

    new_entry = Waitlist(
        user_id=data.get("userId"),
        name=data.get("name"),
        phone=data.get("phone"),
        date=data.get("date"),
        time=data.get("time"),
        guests=data.get("guests"),
        status="waiting",
    )

    db.session.add(new_entry)
    db.session.commit()

    return jsonify({"success": True, "waitlist": new_entry.to_dict()}), 201


@app.route("/api/waitlist/user/<int:user_id>", methods=["GET"])
def get_user_waitlist(user_id):
    entries = Waitlist.query.filter(
        Waitlist.user_id == user_id, Waitlist.status != "cancelled"
    ).all()
    return jsonify([e.to_dict() for e in entries]), 200


@app.route("/api/waitlist/notify", methods=["POST"])
def notify_waitlist():
    data = request.get_json()
    date = data.get("date")
    time = data.get("time")

    entries = Waitlist.query.filter_by(date=date, time=time, status="waiting").all()
    for entry in entries:
        entry.status = "table_available"

    db.session.commit()

    return jsonify({"success": True}), 200


@app.route("/api/waitlist/<int:waitlist_id>/cancel", methods=["PATCH"])
def cancel_waitlist(waitlist_id):
    entry = Waitlist.query.get(waitlist_id)

    if not entry:
        return jsonify({"success": False, "message": "Waitlist entry not found"}), 404

    entry.status = "cancelled"
    db.session.commit()

    return jsonify({"success": True}), 200


# Loyalty Routes

@app.route("/api/loyalty/<int:user_id>", methods=["GET"])
def get_loyalty(user_id):
    record = LoyaltyPoint.query.filter_by(user_id=user_id).first()

    if not record:
        return jsonify({"userId": user_id, "points": 0}), 200

    return jsonify(record.to_dict()), 200


@app.route("/api/loyalty/<int:user_id>/add", methods=["POST"])
def add_loyalty_points(user_id):
    data = request.get_json()
    points_to_add = data.get("points", 10)

    record = LoyaltyPoint.query.filter_by(user_id=user_id).first()

    if not record:
        record = LoyaltyPoint(user_id=user_id, points=points_to_add)
        db.session.add(record)
    else:
        record.points += points_to_add

    db.session.commit()

    return jsonify({"success": True, "loyalty": record.to_dict()}), 200


@app.route("/api/loyalty/<int:user_id>/redeem", methods=["POST"])
def redeem_loyalty(user_id):
    threshold = 50
    record = LoyaltyPoint.query.filter_by(user_id=user_id).first()

    if not record or record.points < threshold:
        return jsonify({"success": False, "message": "Not enough points"}), 400

    record.points -= threshold
    db.session.commit()

    return jsonify({"success": True, "loyalty": record.to_dict()}), 200


# Review Routes

@app.route("/api/reviews/<dish_name>", methods=["GET"])
def get_dish_reviews(dish_name):
    reviews = Review.query.filter_by(dish_name=dish_name).all()

    if not reviews:
        return jsonify({"average": None, "count": 0}), 200

    total = sum(r.rating for r in reviews)
    average = round(total / len(reviews), 1)

    return jsonify({"average": average, "count": len(reviews)}), 200


@app.route("/api/reviews", methods=["POST"])
def add_review():
    data = request.get_json()

    new_review = Review(
        dish_name=data.get("dishName"),
        rating=data.get("rating"),
        user_id=data.get("userId"),
    )

    db.session.add(new_review)
    db.session.commit()

    return jsonify({"success": True}), 201


with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(debug=True, port=5000)