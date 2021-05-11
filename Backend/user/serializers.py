from django.contrib.auth import get_user_model, password_validation
from rest_framework.authtoken.models import Token
from rest_framework import serializers
from django.contrib.auth.models import BaseUserManager
from .models import Users

User = get_user_model()

class UserLoginSerializer(serializers.Serializer):
    user_name = serializers.CharField(max_length=300, required=True)
    password = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'})

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value

class UserRegisterSerializer(serializers.Serializer):
    user_name = serializers.CharField(max_length=300, required=True)
    password = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'})
    email = serializers.EmailField(required= True)
    full_name = serializers.CharField(max_length=300)
    mobile = serializers.CharField(max_length=15)
    address = serializers.CharField(max_length=255)
    city_choice = [('Karachi', 'Karachi'), ('Lahore', 'Lahore'), ('Islamabad', 'Islamabad')]
    city = serializers.ChoiceField(choices=city_choice)

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value



