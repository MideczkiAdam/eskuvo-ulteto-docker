from rest_framework import serializers
from .models import WeddingSettings, WeddingGuest

class WeddingSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeddingSettings
        fields = "__all__"

class WeddingGuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeddingGuest
        fields = "__all__"