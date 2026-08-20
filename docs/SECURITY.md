# DevSetup Security Rules

## Proibido

O usuário nunca pode fornecer diretamente:

- comandos;
- scripts;
- URLs de instalação;
- argumentos arbitrários;
- comandos sudo.

## Permitido

O usuário pode selecionar:

- technology IDs.

O backend resolve os IDs através do catálogo confiável.

## Script Generation

Scripts devem ser:

- determinísticos;
- previsíveis;
- legíveis;
- baseados no catálogo;
- sem comandos destrutivos.