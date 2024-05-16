function plantenVerwijderen() {
    fetch(`http://localhost:5000/update_plant_geteelt_all`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // Leeg lichaam omdat de waarde van plant_geteelt in de API wordt ingesteld
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update plant_geteelt for all plants');
        }
        console.log('Alle planten zijn succesvol bijgewerkt');
        // Vernieuw de pagina of werk de UI bij indien nodig
    })
    .catch(error => {
        console.error('Fout bij het bijwerken van plant_geteelt voor alle planten:', error);
    });
}
    