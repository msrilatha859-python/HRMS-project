from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Employee(models.Model):
    
    user = models. OneToOneField(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    
    employee_id = models.CharField(max_length=20, unique=True)
    
    name = models.CharField(max_length=100)
    
    email = models.EmailField(unique=True)
    
    phone = models.CharField(max_length=15)
    
    department = models.CharField(max_length=100)
    
    designation = models.CharField(max_length=100)
    
    joining_date = models.DateField()
    
    photo = models.ImageField(
        upload_to="employees/",
        blank=True,
        null=True
    )
    STATUS = (
        ("Active", "Active"),
        ("Inactive", "Inactive"),
    )
    
    status = models.CharField(
        max_length=20,
        choices=STATUS,
        default="Active"
    )
    def __str__(self):
        return f"{self.employee_id} - {self.name}"   

    
class Attendance(models.Model):

    STATUS_CHOICES = (
        ("Present", "Present"),
        ("Absent", "Absent"),
        ("Leave", "Leave"),
        ("Late", "Late"),
    )
    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE
    )
    date = models.DateField(auto_now_add=True)
    check_in = models.TimeField(
        null=True,
        blank=True
    )
    check_out = models.TimeField(
        null=True,
        blank=True
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES
    )
    def __str__(self):
        return f"{self.employee.name} - {self.date}"
   
    
    
        
        
        
 
 
        
        
        