import { describe, it, expect } from 'vitest';
import { scriptGenerator } from '../generators/scriptGenerators'; // Ajuste o caminho conforme o seu projeto

describe('Script Generator Service', () => {
  it('deve gerar um script básico corretamente sem instalar snapd', () => {
    const mockTechnologies = [
      {
        id: 'nodejs',
        name: 'Node.js',
        installation_script: 'sudo apt-get install -y nodejs',
      }
    ];

    const result = scriptGenerator.generate(mockTechnologies as any);

    expect(result).toContain('#!/usr/bin/env bash');
    expect(result).toContain('sudo apt-get install -y nodejs');
    expect(result).not.toContain('snapd');
  });

  it('deve injetar a instalação do snapd caso uma tecnologia exija', () => {
    const mockTechnologies = [
      {
        id: 'notion',
        name: 'Notion',
        installation_script: 'sudo snap install notion-snap',
      }
    ];

    const result = scriptGenerator.generate(mockTechnologies as any);

    expect(result).toContain('sudo apt-get update && sudo apt-get install -y snapd');
    expect(result).toContain('sudo snap install notion-snap');
  });
});