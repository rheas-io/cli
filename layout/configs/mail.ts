import { env } from '@rheas/support/helpers';
import { IMailConfig } from '@rheas/contracts/configs';

const mailConfig: IMailConfig = {
    /**
     * Default transporter to be used for sending emails.
     *
     * @property string
     */
    transporter: env('MAIL_DRIVER', 'smtp'),

    /**
     * Applications default from address.
     *
     * @property string
     */
    from: env('MAIL_FROM_ADDRESS', 'hey@example.com'),

    /**
     * Default replyTo address.
     *
     * @property string
     */
    replyTo: env('MAIL_REPLY_TO', 'no-reply@example.com'),
};

export default mailConfig;
