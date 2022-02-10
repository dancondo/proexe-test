declare type NotificationType = 'success' | 'danger' | 'warning' | 'info';

declare interface CreateNotificationDto {
  id?: number;
  title: string;
  message: string;
  timeout?: number;
  type: NotificationType;
}

declare interface NotificationDto extends CreateNotificationDto {
  id: number;
}