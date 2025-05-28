package BackEnd.AdalaHub.model;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class ClientTest {

    @Test
    void testClientConstructorAndGetters() {
        Client client = new Client("Yassine", "Benali", 28, "0612345678", "yassine@example.com");

        assertThat(client.getNom()).isEqualTo("Yassine");
        assertThat(client.getPrenom()).isEqualTo("Benali");
        assertThat(client.getAge()).isEqualTo(28);
        assertThat(client.getTelephone()).isEqualTo("0612345678");
        assertThat(client.getEmail()).isEqualTo("yassine@example.com");
    }

    @Test
    void testSetters() {
        Client client = new Client();
        client.setNom("Karim");
        client.setPrenom("Zahraoui");
        client.setAge(35);

        assertThat(client.getNom()).isEqualTo("Karim");
        assertThat(client.getPrenom()).isEqualTo("Zahraoui");
        assertThat(client.getAge()).isEqualTo(35);
    }

    @Test
    void testRendezVousList() {
        Client client = new Client();
        RendezVous rendezVous = new RendezVous();
        client.setRendezVousList(List.of(rendezVous));

        assertThat(client.getRendezVousList()).hasSize(1);
    }
}
