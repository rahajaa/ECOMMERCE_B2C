# PATH: backend/betoo/api/urls.py

from rest_framework.routers import DefaultRouter
from api.accounting_api import MonthlyAccountingExcel
from api.export_excel import ExportSalesExcel
from api.monitoring_api import MonitoringList
from django.urls import path, re_path, include  
from api.audit import AuditLogView
from .views import (
    ProductViewSet,
    CartViewSet,
    OrderViewSet,
    CheckoutViewSet
)

router = DefaultRouter()

router.register("products", ProductViewSet, basename="products")
router.register("cart", CartViewSet, basename="cart")
router.register("orders", OrderViewSet, basename="orders")
router.register("checkout", CheckoutViewSet, basename="checkout")

urlpatterns = router.urls

urlpatterns += [
    path("export/excel/", ExportSalesExcel.as_view()),
    path("audit/logs/", AuditLogView.as_view()),
    path("monitoring/logs/", MonitoringList.as_view()),
    path("accounting/export_excel/", MonthlyAccountingExcel.as_view()),

]

