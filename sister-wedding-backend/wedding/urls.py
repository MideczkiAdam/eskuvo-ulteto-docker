from django.urls import path
from . import views, docsview

urlpatterns = [
    path("settings/", views.wedding_settings_view, name="settings"),
    path("guests/", views.wedding_guest_view, name="guests"),
    path('guests/<int:pk>/', views.wedding_guest_mod, name='wedding_guest_mod'),
    path("printable/", docsview.export_pdf, name='export_pdf')
]