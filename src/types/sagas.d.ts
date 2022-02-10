declare type SagaAction<T> = {
  type: string
} & T