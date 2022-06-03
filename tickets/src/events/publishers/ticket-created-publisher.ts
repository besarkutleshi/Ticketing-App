import { Publisher, Subjects, TicketCreatedEvent } from '@bkorg/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
