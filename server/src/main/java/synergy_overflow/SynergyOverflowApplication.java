package synergy_overflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class SynergyOverflowApplication {

	public static void main(String[] args) {
		SpringApplication.run(SynergyOverflowApplication.class, args);
	}

}
