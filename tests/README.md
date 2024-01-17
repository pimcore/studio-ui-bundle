# Test Environment
## Setup Test Environment
1. Spin up your docker container:
    ```bash
    docker-compose up -d
    ```
2. Open the bash of the php container:
    ```bash
    docker-compose exec php bash
    ```
3. Move to the working directory:
    ```bash
    cd /var/cli
    ```
4. Install the dependencies:
    ```bash
    composer install
    ```

## Run the tests
When all dependencies are installed you can run the tests with the following command:
```bash
./vendor/bin/codecept run -vvv
```