from django.core.management.base import BaseCommand
from core.models import Category


class Command(BaseCommand):
    """Django command to initialize categories."""
    
    help = "Initialize default categories"
    
    def handle(self, *args, **options):
        """Handle the command."""
        self.stdout.write("Creating default categories...")
        
        categories = [
            {
                'name': 'Sécurité Alimentaire',
                'code': Category.CategoryType.FOOD,
                'description': 'Indicateurs de sécurité alimentaire'
            },
            {
                'name': 'Nutrition',
                'code': Category.CategoryType.NUTRITION,
                'description': 'Indicateurs de nutrition'
            },
            {
                'name': 'Eau et Assainissement',
                'code': Category.CategoryType.WATER,
                'description': 'Indicateurs d\'accès à l\'eau potable et d\'assainissement'
            },
            {
                'name': 'Vulnérabilité',
                'code': Category.CategoryType.VULNERABILITY,
                'description': 'Indicateurs de vulnérabilité des ménages'
            },
            {
                'name': 'Agriculture',
                'code': Category.CategoryType.AGRICULTURE,
                'description': 'Indicateurs agricoles'
            },
            {
                'name': 'Élevage',
                'code': Category.CategoryType.LIVESTOCK,
                'description': 'Indicateurs d\'élevage'
            },
            {
                'name': 'Marché',
                'code': Category.CategoryType.MARKET,
                'description': 'Indicateurs de marché'
            },
        ]
        
        for category_data in categories:
            category, created = Category.objects.get_or_create(
                code=category_data['code'],
                defaults={
                    'name': category_data['name'],
                    'description': category_data['description']
                }
            )
            
            status = 'Created' if created else 'Already exists'
            self.stdout.write(f"{status}: {category.name}")
        
        self.stdout.write(self.style.SUCCESS("Categories initialized successfully!")) 