@Library(['shared-library', 'pipeline-library']) _

PipelineDockerEntry([
    // Project Name
    // Adalah nama dari project anda. Nama sudah ditentukan di awal, mohon tidak di ubah tanpa komunikasi dengan tim Playcourt
    projectName: 'dtp-digitalpass',

    // Telegram Notification
    // Pada bagian ini anda dapat mengubah "telegramChatId" dengan chat id anda. Chat id akan digunakan untuk mengirim notifikasi setiap pipeline selesai
    telegramChatId: '-1001215679728',

    // Prerun Script
    // Pada bagian ini anda dapat menambahkan dan mengkonfigurasikan script untuk dijalankan sebelum melakukan test atau build service yang anda buat
    prerunAgent: 'Gitops', // "prerunAgent" dapat diubah sesuai dengan label agent pada https://jenkins.playcourt.id
    prerunAgentImage: 'playcourt/jenkins:nodejs14', // "prerunAgentImage" wajib didefinisikan jika menggunakan agent Docker
    prerunScript: {
        // "prerunScript" berisi groovy script yang akan dijalankan sebelum step test dan build
        // Pada bagian ini anda juga dapat membuat variable dan menggunakannya pada script yang lain

        // contoh script untuk mengambil secret dari Vault:
        def vault = new Vault()
        NODE_ENV = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", 'ENV')
        ENV = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", 'ENV')
        baseURL = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "baseURL")


        INTEGRATION_KEY_ANTARES = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "INTEGRATION_KEY_ANTARES")
        INTEGRATION_KEY_GAMEQOO = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "INTEGRATION_KEY_GAMEQOO")
        INTEGRATION_KEY_OCA = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "INTEGRATION_KEY_OCA")
        INTEGRATION_KEY_BIGBOX = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "INTEGRATION_KEY_BIGBOX")
        INTEGRATION_KEY_PADI_UMKM = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "INTEGRATION_KEY_PADI_UMKM")
        INTEGRATION_KEY_PEDULI_LINDUNGI = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "INTEGRATION_KEY_PEDULI_LINDUNGI")
        INTEGRATION_KEY_PIJAR_MAHIR = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "INTEGRATION_KEY_PIJAR_MAHIR")
        INTEGRATION_KEY_MY_PERTAMINA = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "INTEGRATION_KEY_MY_PERTAMINA")

        PRODUCT_KEY_ANTARES = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "PRODUCT_KEY_ANTARES")
        PRODUCT_KEY_GAMEQOO = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "PRODUCT_KEY_GAMEQOO")
        PRODUCT_KEY_OCA = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "PRODUCT_KEY_OCA")
        PRODUCT_KEY_BIGBOX = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "PRODUCT_KEY_BIGBOX")
        PRODUCT_KEY_PADI_UMKM = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "PRODUCT_KEY_PADI_UMKM")
        PRODUCT_KEY_PEDULI_LINDUNGI = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "PRODUCT_KEY_PEDULI_LINDUNGI")
        PRODUCT_KEY_PIJAR_MAHIR = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "PRODUCT_KEY_PIJAR_MAHIR")
        PRODUCT_KEY_MY_PERTAMINA = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "PRODUCT_KEY_MY_PERTAMINA")

        FIREBASE_API_KEY = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "FIREBASE_API_KEY")
        FIREBASE_AUTHDOMAIN = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "FIREBASE_AUTHDOMAIN")
        FIREBASE_PROJECTID = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "FIREBASE_PROJECTID")
        FIREBASE_STORAGEBUCKET = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "FIREBASE_STORAGEBUCKET")
        FIREBASE_MESSAGING_SENDER_ID = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "FIREBASE_MESSAGING_SENDER_ID")
        FIREBASE_APP_ID = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "FIREBASE_APP_ID")
        FIREBASE_MEASUREMENT_ID = vault.vault("other/dtp-digitalpass/${env.BRANCH_NAME}/dtp-digitalpass-fe", "FIREBASE_MEASUREMENT_ID")

    },

    // Service Test
    // Pada bagian ini anda dapat menambahkan dan mengkonfigurasikan script untuk menjalankan test pada service yang anda buat
    testAgent: 'Docker', // "testAgent" dapat diubah sesuai dengan label agent pada https://jenkins.playcourt.id
    testAgentImage: 'playcourt/jenkins:nodejs14', // "testAgentImage" wajib didefinisikan jika menggunakan agent Docker
    runTestScript: {
        // "runTestScript" berisi groovy script untuk menjalankan test

        // contoh script untuk menjalankan test pada service nodejs
        sh "npm install"
        sh "npm run test"
    },

    // Build Docker Image
    // Pada bagian ini anda dapat mengkonfigurasikan script untuk membuat image dari service yang anda buat
    imageName: 'dtp-digitalpass-fe', // "imageName" adalah nama dari service yang anda buat
    buildAgent: 'Docker', // "buildAgent" dapat diubah sesuai dengan label agent pada https://jenkins.playcourt.id
    buildDockerImageScript: { String imageTag, String envStage ->
        // "buildDockerImageScript" berisi groovy script untuk melakukan build image
        // Image yang dibuat wajib menggunakan tag dari variable imageTag

        // contoh script untuk membuat image dan menggunakan variable yang dibuat pada prerunScript
        // sh "docker build --build-arg ARGS_NODE_BUILD=${envStage} --build-arg APP_KEY=${APP_KEY} --rm --no-cache -t ${imageTag} ."

        sh "docker build \
            --build-arg ARGS_NODE_BUILD=${envStage} \
            --build-arg ENV=${envStage} \
            --build-arg INTEGRATION_KEY_ANTARES=${baseURL}} \
            --build-arg INTEGRATION_KEY_GAMEQOO=${INTEGRATION_KEY_GAMEQOO}} \
            --build-arg INTEGRATION_KEY_OCA=${INTEGRATION_KEY_OCA}} \
            --build-arg INTEGRATION_KEY_BIGBOX=${INTEGRATION_KEY_BIGBOX}} \
            --build-arg INTEGRATION_KEY_PADI_UMKM=${INTEGRATION_KEY_PADI_UMKM}} \
            --build-arg INTEGRATION_KEY_PEDULI_LINDUNGI=${INTEGRATION_KEY_PEDULI_LINDUNGI}} \
            --build-arg INTEGRATION_KEY_PIJAR_MAHIR=${INTEGRATION_KEY_PIJAR_MAHIR}} \
            --build-arg INTEGRATION_KEY_MY_PERTAMINA=${INTEGRATION_KEY_MY_PERTAMINA}} \
            --build-arg PRODUCT_KEY_ANTARES=${PRODUCT_KEY_ANTARES}} \
            --build-arg PRODUCT_KEY_GAMEQOO=${PRODUCT_KEY_GAMEQOO}} \
            --build-arg PRODUCT_KEY_OCA=${PRODUCT_KEY_OCA}} \
            --build-arg PRODUCT_KEY_BIGBOX=${PRODUCT_KEY_BIGBOX}} \
            --build-arg PRODUCT_KEY_PADI_UMKM=${PRODUCT_KEY_PADI_UMKM}} \
            --build-arg PRODUCT_KEY_PEDULI_LINDUNGI=${PRODUCT_KEY_PEDULI_LINDUNGI}} \
            --build-arg PRODUCT_KEY_PIJAR_MAHIR=${PRODUCT_KEY_PIJAR_MAHIR}} \
            --build-arg PRODUCT_KEY_MY_PERTAMINA=${PRODUCT_KEY_MY_PERTAMINA}} \
            --build-arg FIREBASE_API_KEY=${FIREBASE_API_KEY}} \
            --build-arg FIREBASE_AUTHDOMAIN=${FIREBASE_AUTHDOMAIN}} \
            --build-arg FIREBASE_PROJECTID=${FIREBASE_PROJECTID}} \
            --build-arg FIREBASE_STORAGEBUCKET=${FIREBASE_STORAGEBUCKET}} \
            --build-arg FIREBASE_MESSAGING_SENDER_ID=${FIREBASE_MESSAGING_SENDER_ID}} \
            --build-arg FIREBASE_APP_ID=${FIREBASE_APP_ID}} \
            --build-arg FIREBASE_MEASUREMENT_ID=${FIREBASE_MEASUREMENT_ID}} \
            --rm --no-cache -t ${imageTag} ."
    },

    // Deployment
    // Pada bagian ini anda dapat mengkonfigurasi dimana service akan dideploy
    // Value dari variable ini sudah ditentukan di awal dan mohon tidak diubah tanpa komunikasi dengan tim Playcourt
    deployment: 'abcv2',

    // Post Run Script
    // Pada bagian ini anda dapat menambahkan script untuk dijalankan setelah proses pada pipeline selesai
    postrunScript: [
        always: {
            // Pada bagian ini script akan dijalankan setiap pipeline selesai
        },

        success: {
            // Pada bagian ini script hanya akan dijalankan jika pipeline sukses
        },

        failure: {
            // Pada bagian ini script hanya akan dijalankan jika pipeline gagal
        }
    ]
])
