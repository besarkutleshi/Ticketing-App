import { Publisher, Subjects, TicketUpdatedEvent } from '@bkorg/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
