import Metadata from './';

class ExceptionMetadata extends Metadata {
  private exception;

  constructor(exception) {
    super();
    this.exception = exception;
  }
}

export default ExceptionMetadata;
