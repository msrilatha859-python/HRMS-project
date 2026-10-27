from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def employee_check_in(request):
    try:
        employee = Employee.objects.get(user=request.user)
    except Employee.DoesNotExist:
        return Response(
            {"error": "Your user account is not linked to an employee profile."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    today = timezone.localdate()
    current_time = timezone.localtime().time().replace(microsecond=0)

    attendance, created = Attendance.objects.get_or_create(
        employee=employee,
        date=today,
        defaults={
            "check_in": current_time,
            "status": "Present",
        },
    )

    if not created:
        return Response(
            {"error": "You have already checked in today."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response(
        AttendanceSerializer(attendance).data,
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def employee_check_out(request):
    try:
        employee = Employee.objects.get(user=request.user)
    except Employee.DoesNotExist:
        return Response(
            {"error": "Your user account is not linked to an employee profile."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    today = timezone.localdate()

    try:
        attendance = Attendance.objects.get(employee=employee, date=today)
    except Attendance.DoesNotExist:
        return Response(
            {"error": "You must check in before checking out."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not attendance.check_in:
        return Response(
            {"error": "You must check in before checking out."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if attendance.check_out:
        return Response(
            {"error": "You have already checked out today."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    attendance.check_out = timezone.localtime().time().replace(microsecond=0)
    attendance.save(update_fields=["check_out"])

    return Response(AttendanceSerializer(attendance).data)