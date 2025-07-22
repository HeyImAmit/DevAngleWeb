package com.amit.devangleBack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DevangleBackApplication {

    public static void main(String[] args) {
        if (isLocalEnvironment()) {
            io.github.cdimascio.dotenv.Dotenv dotenv = io.github.cdimascio.dotenv.Dotenv.configure()
                    .ignoreIfMissing()
                    .load();
            dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
        }
        SpringApplication.run(DevangleBackApplication.class, args);
    }

    private static boolean isLocalEnvironment() {
        // Example: check a custom env variable or Spring profile
        String env = System.getenv("ENV");
        return env == null || env.equals("local");
    }

}
