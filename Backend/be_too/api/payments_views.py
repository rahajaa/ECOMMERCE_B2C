# PATH: backend/betoo/api/payments_views.py

from rest_framework.views import APIView
from rest_framework.response import Response

from payments.models import Payment
from orders.models import Order
from payments.services import get_payment_instructions


class StartPayment(APIView):

    def post(self, request):

        order = Order.objects.get(id=request.data["order_id"])

        provider = request.data["provider"]

        instructions = get_payment_instructions(
            provider,
            order.total
        )

        return Response(instructions)


class SubmitPayment(APIView):

    def post(self, request):

        payment = Payment.objects.create(
            order_id=request.data["order_id"],
            provider=request.data["provider"],
            phone_number=request.data["phone"],
            transaction_id=request.data["tx"],
            amount=request.data["amount"]
        )

        return Response({
            "message": "Paiement en attente de vérification"
        })
