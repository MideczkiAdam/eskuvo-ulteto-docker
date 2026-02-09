from django.db import models

class WeddingSettings(models.Model):
    side1 = models.TextField(default="Szeretettel üdvözöljük!")

    side2 = models.TextField(default="", blank=True, null=True)
    side3 = models.TextField(default="", blank=True, null=True)

    side2_image = models.ImageField(upload_to='wedding_images/', blank=True, null=True)
    side3_image = models.ImageField(upload_to='wedding_images/', blank=True, null=True)

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    class Meta:
        verbose_name = "Esküvői beállítás"
        verbose_name_plural = "Esküvői beállítások"

    def __str__(self):
        return "Esküvői beállítások"


class WeddingGuest(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name