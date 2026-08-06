from celery import Celery
from backend.core.config import settings

celery_app = Celery(
    "asys_tasks",
    broker=f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}/0",
    backend=f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}/1"
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="America/Bogota",
    enable_utc=True,
)

@celery_app.task(name="apify_scraping_job_stub")
def apify_scraping_job_stub(enterprise_nit: str):
    """Placeholder Celery async task for Apify B2B company scraper."""
    return {"status": "success", "nit": enterprise_nit, "message": "Scraper task queued"}

@celery_app.task(name="whatsapp_outreach_job_stub")
def whatsapp_outreach_job_stub(prospect_phone: str, template_id: str):
    """Placeholder Celery async task for Meta WhatsApp Cloud API outreach."""
    return {"status": "sent", "phone": prospect_phone, "template": template_id}
