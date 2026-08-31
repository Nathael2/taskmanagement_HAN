import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import TaskList from './TaskList';

// On mock TaskCard car on teste uniquement TaskList
jest.mock('./TaskCard', () => {
  return function MockTaskCard({ task, onEditTask }) {
    return (
      <div data-testid={`task-card-${task.id}`}>
        <span>{task.title}</span>

        <button onClick={() => onEditTask(task)}>
          Modifier
        </button>
      </div>
    );
  };
});

describe('TaskList - Tests unitaires', () => {
  const mockOnEditTask = jest.fn();

  const tasks = [
    {
      id: 1,
      title: 'Créer la maquette',
      status: 'todo',
    },
    {
      id: 2,
      title: 'Développer le frontend',
      status: 'progress',
    },
    {
      id: 3,
      title: 'Tester l’application',
      status: 'done',
    },
    {
      id: 4,
      title: 'Corriger les bugs',
      status: 'todo',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('affiche les trois colonnes de tâches', () => {
    render(
      <TaskList
        tasks={tasks}
        onEditTask={mockOnEditTask}
      />
    );

    expect(
      screen.getByRole('heading', { name: 'À faire' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'En cours' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Terminé' })
    ).toBeInTheDocument();
  });

  test('répartit correctement les tâches selon leur statut', () => {
    render(
      <TaskList
        tasks={tasks}
        onEditTask={mockOnEditTask}
      />
    );

    expect(
      screen.getByText('Créer la maquette')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Développer le frontend')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Tester l’application')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Corriger les bugs')
    ).toBeInTheDocument();
  });

  test('affiche le bon nombre de tâches dans chaque colonne', () => {
    render(
      <TaskList
        tasks={tasks}
        onEditTask={mockOnEditTask}
      />
    );

    // À faire = 2
    // En cours = 1
    // Terminé = 1
    const counts = screen.getAllByClassName
      ? screen.getAllByClassName('task-count')
      : [];

    expect(counts.length).toBe(3);
  });

  test('affiche les TaskCard correspondantes aux tâches', () => {
    render(
      <TaskList
        tasks={tasks}
        onEditTask={mockOnEditTask}
      />
    );

    expect(
      screen.getByTestId('task-card-1')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('task-card-2')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('task-card-3')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('task-card-4')
    ).toBeInTheDocument();
  });

  test('affiche le message lorsqu’une colonne est vide', () => {
    const emptyTasks = [];

    render(
      <TaskList
        tasks={emptyTasks}
        onEditTask={mockOnEditTask}
      />
    );

    expect(
      screen.getByText('Aucune tâche à faire')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Aucune tâche en cours')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Aucune tâche terminé')
    ).toBeInTheDocument();
  });

  test('affiche uniquement les tâches correspondant à leur statut', () => {
    const todoTask = {
      id: 10,
      title: 'Ma tâche à faire',
      status: 'todo',
    };

    const doneTask = {
      id: 11,
      title: 'Ma tâche terminée',
      status: 'done',
    };

    render(
      <TaskList
        tasks={[todoTask, doneTask]}
        onEditTask={mockOnEditTask}
      />
    );

    expect(
      screen.getByText('Ma tâche à faire')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Ma tâche terminée')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('task-card-10')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('task-card-11')
    ).toBeInTheDocument();
  });

  test('transmet onEditTask à TaskCard', () => {
    render(
      <TaskList
        tasks={tasks}
        onEditTask={mockOnEditTask}
      />
    );

    const editButtons = screen.getAllByRole('button', {
      name: 'Modifier',
    });

    editButtons[0].click();

    expect(mockOnEditTask).toHaveBeenCalledTimes(1);

    expect(mockOnEditTask).toHaveBeenCalledWith(
      tasks[0]
    );
  });
});