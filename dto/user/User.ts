import { model, Schema } from 'mongoose';
import UseSchema from './UseSchema';

export const UserDTO = new Schema(UseSchema);

export default model('users', UserDTO);
