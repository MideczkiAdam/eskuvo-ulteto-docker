from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import WeddingSettings, WeddingGuest
from .serializers import WeddingSettingsSerializer, WeddingGuestSerializer
from rest_framework.permissions import IsAuthenticated

@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def wedding_settings_view(request):
    settings = WeddingSettings.objects.first()
    if not settings:
        settings = WeddingSettings.objects.create()
    
    if request.method == 'GET':
        serializer = WeddingSettingsSerializer(settings)
        return Response(serializer.data)
    
    if request.method == 'PATCH':
        serializer = WeddingSettingsSerializer(settings, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def wedding_guest_view(request):
    if request.method == 'GET':
        guests = WeddingGuest.objects.all()
        serializer = WeddingGuestSerializer(guests, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = WeddingGuestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def wedding_guest_mod(request, pk):
        if request.method == 'DELETE':
            try:
                guest = WeddingGuest.objects.get(id=pk)
            except WeddingGuest.DoesNotExist:
                return Response({'error': 'Guest not found'}, status=404)
            
            guest.delete()
            return Response(status=204)
        if request.method == 'PATCH':
            try:
                guest = WeddingGuest.objects.get(id=pk)
            except WeddingGuest.DoesNotExist:
                return Response({'error': 'Guest not found'}, status=404)
            
            serializer = WeddingGuestSerializer(guest, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)