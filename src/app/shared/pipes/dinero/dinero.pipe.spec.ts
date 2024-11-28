import { DineroPipe } from './dinero.pipe';

describe('DineroPipe', () => {
  it('create an instance', () => {
    const pipe = new DineroPipe();
    expect(pipe).toBeTruthy();
  });

  it('La salida de pipe es un numero con comas', () => {
    const pipe = new DineroPipe();
    const numero = 19500;
    const resultado = pipe.transform(numero);
    expect(resultado).toEqual("19,500");
  });
});
