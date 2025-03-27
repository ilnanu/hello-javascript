//Crea un test, utilizando las herramientas propias del lenguaje, que sea capaz de determinar si esa función se ejecuta correctamente.
test('Sumar 1 + 2 es igual a 3', () => {
    expect(sumar(1, 2)).toBe(3);
});


test('Existen todos los campos', () => {
    expect(persona).toHaveProperty('nombre');
    expect(persona).toHaveProperty('edad');
    expect(persona).toHaveProperty('fecha_nacimiento');
    expect(persona).toHaveProperty('lenguajes');
});

test('Los datos introducidos son correctos', () => {
    expect(persona.nombre).toBe("Juan");
    expect(persona.edad).toBe(30);
    expect(persona.fecha_nacimiento).toBe("12/05/1980");
    expect(persona.lenguajes).toEqual(["JavaScript", "Python", "Java"]);
});
