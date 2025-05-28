package BackEnd.AdalaHub.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

class RendezVousTest {

    @Test
    void testRendezVousConstructorAndGetters() {
        AvocatDetails avocat = new AvocatDetails();
        avocat.setNom("Amrani");

        Client client = new Client();
        client.setNom("Yassine");

        LocalDateTime futureDate = LocalDateTime.now().plusDays(1);

        RendezVous rendezVous = new RendezVous(avocat, client, "Consultation juridique", futureDate);

        assertThat(rendezVous.getAvocat().getNom()).isEqualTo("Amrani");
        assertThat(rendezVous.getClient().getNom()).isEqualTo("Yassine");
        assertThat(rendezVous.getMotif()).isEqualTo("Consultation juridique");
        assertThat(rendezVous.getDateHeure()).isEqualTo(futureDate);
        assertThat(rendezVous.getStatut()).isEqualTo("EN_ATTENTE");
    }

    @Test
    void testSetters() {
        RendezVous rendezVous = new RendezVous();
        rendezVous.setMotif("Procédure divorce");
        rendezVous.setStatut("CONFIRMÉ");

        assertThat(rendezVous.getMotif()).isEqualTo("Procédure divorce");
        assertThat(rendezVous.getStatut()).isEqualTo("CONFIRMÉ");
    }
}
