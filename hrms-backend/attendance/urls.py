from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    EmployeeViewSet,
    AttendanceViewSet,
    employee_check_in,
    employee_check_out,
)

router = DefaultRouter()
router.register('employees', EmployeeViewSet)
router.register('attendance', AttendanceViewSet)

urlpatterns = [
    path('attendance/check-in/', employee_check_in, name='employee-check-in'),
    path('attendance/check-out/', employee_check_out, name='employee-check-out'),
] + router.urls