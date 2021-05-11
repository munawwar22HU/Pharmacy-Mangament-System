from django.contrib.auth import authenticate, get_user_model, login
from rest_framework import serializers
from .models import Users

def get_and_authenticate_user(request, email, password):
    user = authenticate(username=email, password=password)
    if user is None:
        raise serializers.ValidationError("Invalid username/password. Please try again!")
    else:
        login(request, user) # Redirect to a success page.
    return user

def create_user_account(user_name, password, user_id):
    User = Users.objects.get(idUsers = user_id)
    user = get_user_model().objects.create_user(idUsers = User,
        username=user_name, password=password)
    user.save()
    return user

def register_user()