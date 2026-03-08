export class OkResponseDto<T = unknown> {
  status!: 'OK';
  data?: T;
}
