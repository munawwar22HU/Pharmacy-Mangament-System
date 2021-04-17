from django.db import models

# Create your models here.
class Login(models.User):
    idUsers = models.ForeignKey(Users, on_delete=models.CASCADE)



class Users(models.Model):
    idUsers = models.AutoField(primary_key = True)
    idRole = models.ForeignKey(Role, on_delete=models.CASCADE)
    Name = models.CharField(max_length=255)
    UserMobile = models.CharField(max_length=15, unique= True)
    DateOfBirth = models.DateField(auto_now_add= False)
    Email = models.EmailField(max_length=100)
    StreetAddress = models.CharField(max_length=255)
    City = models.CharField(max_length=255)

class Role(models.Model):
    idRole = models.AutoField(primary_key = True)
    RoleName = models.CharField(max_length=100)
    RoleDesc = models.CharField(max_length=1000)



class AccessRights(models.Model):
    idRole = models.ForeignKey(Role, on_delete=models.CASCADE)
    idPermission = models.ForeignKey(Permission, on_delete=models.CASCADE)



class Permission(models.Model):
    idPermission = models.AutoField(primary_key = True)
    Name = models.CharField(max_length=100)