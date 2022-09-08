require("dotenv").config();
const { colors } = require("./constants");
const { spawnSync } = require("child_process");

//@comments: Se lee el entorno al que se esta trantado de autenticar
const [, , environment, nulldev] = process.argv;

if (!environment) {
    console.error(colors.error, `The command need a NetSuite environment for a new authentication`);
    process.exit(1);
}

//@comments: Ejecución de main para realizar la autenticación a la instancia de netsuite
__main__(environment);

function __main__(environment) {
    environment = environment.toUpperCase();
    const CREDETIALS = {
        account: process.env[`${environment}_ACCOUNT_ID`],
        authid: process.env[`${environment}_AUTH_ID`],
        tokenid: process.env[`${environment}_TOKEN_ID`],
        tokensecret: process.env[`${environment}_TOKEN_SECRET`],
    };
    //@comments: Se ejecuta el comando de autenticación a NetSuite
    const suiteCloudCmd = `suitecloud account:savetoken --account ${CREDETIALS.account} --authid ${CREDETIALS.authid} --tokenid ${CREDETIALS.tokenid} --tokensecret ${CREDETIALS.tokensecret}`;
    console.log(colors.info, `> ${suiteCloudCmd}`);
    const suiteCloudRun = spawnSync(suiteCloudCmd, { shell: true });

    //@comments: Se obtiene el resultado de la ejecución del comando y se interpreta la stdout/stderr y se finaliza el script
    const { stderr, stdout, error } = suiteCloudRun;
    const response = {
        ok: stdout.toString() || stderr.toString(),
        error: error?.toString()
    };
    const exitCode = response.ok.match(/error/i) ? 1 : 0;

    console.error(response.ok || response.error);
    process.exit(exitCode);
}