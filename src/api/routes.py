@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "user")  # Si no se envía, será "user"

    if not email or not password:
        return jsonify({"msg": "Correo y contraseña requeridos"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "El usuario ya existe"}), 400

    new_user = User(email=email, role=role)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario registrado exitosamente"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Correo o contraseña incorrectos"}), 401

    token = jwt.encode({"user_id": user.id, "role": user.role, "exp": datetime.utcnow() + timedelta(hours=1)},
                       app.config["SECRET_KEY"], algorithm="HS256")

    refresh_token = jwt.encode({"user_id": user.id, "type": "refresh", "exp": datetime.utcnow() + timedelta(days=7)},
                               app.config["SECRET_KEY"], algorithm="HS256")

    return jsonify({"token": token, "refresh_token": refresh_token, "role": user.role}), 200


