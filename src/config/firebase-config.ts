import admin, { type ServiceAccount } from 'firebase-admin'
import serviceAccount from './service_account.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
})

export default admin
