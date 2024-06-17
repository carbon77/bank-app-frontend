import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: 'http://localhost:8083',
    realm: 'bank-app',
    clientId: 'react-bank-app',
})

export default keycloak