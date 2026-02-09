from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from django.template.loader import render_to_string
from weasyprint import HTML
from .models import WeddingGuest, WeddingSettings

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def export_pdf(request):
    settings = WeddingSettings.objects.get(id=1)
    guests = WeddingGuest.objects.all()
    html_string = render_to_string("pdf/document.html", {
        "settings": settings,
        "guests": guests
    })
    pdf_file = HTML(string=html_string).write_pdf()
    response = HttpResponse(pdf_file, content_type="application/pdf")
    response["Content-Disposition"] = 'attachment; filename="export.pdf"'
    return response