import React from 'react';
import './styles.scss';


export interface IFormUiMessageProps {
    type: string;
}

const Message: React.FC<IFormUiMessageProps> = ({ ...props }) => {
  const { type } = props;

  let message = ((type === 'SUCCESS') && 'SUCCESS_MESSAGE') || ((type === 'FAILURE') && 'FAILURE_MESSAGE');
  let fieldClass = (((type === 'SUCCESS') && 'field-success') || ((type === 'FAILURE') && 'field-error')) as string;

  return (
    <React.Fragment>
    { message && (
        <div className={'field-message'}>
          <span className={fieldClass}>{message}</span>
        </div>
      )}
    </React.Fragment>
  );
};

export default Message;
