package BackEnd.AdalaHub.model;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class AvocatDetailsTest {

    private static Validator validator;

    @BeforeAll
    public static void setupValidatorInstance() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    private AvocatDetails createValidAvocat() {
        return new AvocatDetails(
                "Maitre",
                "Ali",
                "Ben Salah",
                "ali.bensalah@example.com",
                "securePass123",
                "Droit pénal",
                "123 Rue du Cabinet",
                "0612345678",
                "0612345679",
                "Maroc",
                "Avocat expérimenté",
                false,
                true,
                true,
                "Casablanca",
                "Conseil juridique"
        );
    }

    @Test
    public void testValidAvocatDetails_ShouldHaveNoViolations() {
        AvocatDetails avocat = createValidAvocat();
        Set<ConstraintViolation<AvocatDetails>> violations = validator.validate(avocat);
        assertTrue(violations.isEmpty(), "Il ne devrait pas y avoir de violations");
    }

    @Test
    public void testInvalidEmail_ShouldRaiseViolation() {
        AvocatDetails avocat = createValidAvocat();
        avocat.setEmail("invalid-email");
        Set<ConstraintViolation<AvocatDetails>> violations = validator.validate(avocat);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("email")));
    }

    @Test
    public void testEmptyPrenom_ShouldRaiseViolation() {
        AvocatDetails avocat = createValidAvocat();
        avocat.setPrenom("");
        Set<ConstraintViolation<AvocatDetails>> violations = validator.validate(avocat);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("prenom")));
    }

    @Test
    public void testShortPassword_ShouldRaiseViolation() {
        AvocatDetails avocat = createValidAvocat();
        avocat.setPassword("123");  // trop court
        Set<ConstraintViolation<AvocatDetails>> violations = validator.validate(avocat);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("password")));
    }

    @Test
    public void testInvalidPhone_ShouldRaiseViolation() {
        AvocatDetails avocat = createValidAvocat();
        avocat.setOfficeTelephone("123456");  // invalide
        Set<ConstraintViolation<AvocatDetails>> violations = validator.validate(avocat);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("officeTelephone")));
    }

}
