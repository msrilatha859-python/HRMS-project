from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, AttendanceViewSet

router = DefaultRouter()
router.register('employees', EmployeeViewSet)
router.register('attendence', AttendanceViewSet)

urlpatterns = router.urls


