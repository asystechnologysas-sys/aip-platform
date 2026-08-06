import logging
from typing import Callable, Dict, List

logger = logging.getLogger("asys_logger")

class EventBus:
    """
    Publish/Subscribe Event Bus Interface stub prepared for Redis PubSub,
    RabbitMQ, or NATS event streaming.
    """
    def __init__(self):
        self._subscribers: Dict[str, List[Callable]] = {}

    def subscribe(self, event_type: str, handler: Callable):
        if event_type not in self._subscribers:
            self._subscribers[event_type] = []
        self._subscribers[event_type].append(handler)
        logger.info(f"[EventBus] Subscribed to {event_type}")

    async def publish(self, event_type: str, payload: dict):
        logger.info(f"[EventBus] Publishing event '{event_type}': {payload}")
        if event_type in self._subscribers:
            for handler in self._subscribers[event_type]:
                await handler(payload)

event_bus = EventBus()
