import { Reservation } from '../../data/models';

export async function updateReservation(id, paymentId) {
    const reservation = await Reservation.update({
        paymentState: 'completed',
       },
       {
          where: {
            id,
            paymentIntentId: paymentId
          }
       });

    if(reservation) {
        return {
          status: 'updated'
        };
    } else {
        return {
          status: 'failed to update the reservation'
        }
    }
}