import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskCard from './TaskCard';
import { useTask } from '../contexts/TaskContext';

jest.mock('../contexts/TaskContext', () => ({
  useTask: jest.fn(),
}));

describe('TaskCard', () => {
  const updateTask = jest.fn();
  const deleteTask = jest.fn();
  const onEditTask = jest.fn();

  const task = {
    id: 1,
    title: 'Créer une nouvelle fonctionnalité',
    description: 'Ajouter la fonctionnalité de gestion des tâches',
    priority: 'high',
    status: 'todo',
    assignedTo: 10,
    createdAt: '2026-08-30T10:00:00.000Z',
  };

  const users = [
    {
      id: 10,
      name: 'Jean Dupont',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    useTask.mockReturnValue({
      updateTask,
      deleteTask,
      users,
    });

    // Évite les problèmes liés à l'implémentation de confirm
    window.confirm = jest.fn();
  });

  it('affiche correctement les informations de la tâche', () => {
    render(<TaskCard task={task} onEditTask={onEditTask} />);

    expect(
      screen.getByRole('heading', {
        name: 'Créer une nouvelle fonctionnalité',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Ajouter la fonctionnalité de gestion des tâches'
      )
    ).toBeInTheDocument();

    expect(screen.getByText('Haute')).toBeInTheDocument();
    expect(screen.getByText(/Jean Dupont/)).toBeInTheDocument();
    expect(screen.getByDisplayValue('todo')).toBeInTheDocument();
  });

  it('n’affiche pas la description lorsqu’elle est absente', () => {
    const taskWithoutDescription = {
      ...task,
      description: '',
    };

    render(
      <TaskCard
        task={taskWithoutDescription}
        onEditTask={onEditTask}
      />
    );

    expect(
      screen.queryByText(
        'Ajouter la fonctionnalité de gestion des tâches'
      )
    ).not.toBeInTheDocument();
  });

  it('affiche la bonne priorité pour une tâche moyenne', () => {
    const mediumTask = {
      ...task,
      priority: 'medium',
    };

    render(<TaskCard task={mediumTask} onEditTask={onEditTask} />);

    expect(screen.getByText('Moyenne')).toBeInTheDocument();
  });

  it('affiche la bonne priorité pour une tâche basse', () => {
    const lowTask = {
      ...task,
      priority: 'low',
    };

    render(<TaskCard task={lowTask} onEditTask={onEditTask} />);

    expect(screen.getByText('Basse')).toBeInTheDocument();
  });

  it('affiche l’utilisateur assigné', () => {
    render(<TaskCard task={task} onEditTask={onEditTask} />);

    expect(screen.getByText(/Jean Dupont/)).toBeInTheDocument();
  });

  it('n’affiche pas d’utilisateur si aucun utilisateur ne correspond', () => {
    const unassignedTask = {
      ...task,
      assignedTo: 999,
    };

    render(
      <TaskCard task={unassignedTask} onEditTask={onEditTask} />
    );

    expect(screen.queryByText(/Jean Dupont/)).not.toBeInTheDocument();
  });

  it('appelle onEditTask lorsqu’on clique sur modifier', () => {
    render(<TaskCard task={task} onEditTask={onEditTask} />);

    const editButton = screen.getByTitle('Modifier');

    fireEvent.click(editButton);

    expect(onEditTask).toHaveBeenCalledTimes(1);
    expect(onEditTask).toHaveBeenCalledWith(task);
  });

  it('met à jour le statut lorsqu’il change', async () => {
    updateTask.mockResolvedValueOnce();

    render(<TaskCard task={task} onEditTask={onEditTask} />);

    const select = screen.getByRole('combobox');

    fireEvent.change(select, {
      target: {
        value: 'progress',
      },
    });

    await waitFor(() => {
      expect(updateTask).toHaveBeenCalledTimes(1);
    });

    expect(updateTask).toHaveBeenCalledWith(1, {
      status: 'progress',
    });
  });

  it('met à jour le statut vers "done"', async () => {
    updateTask.mockResolvedValueOnce();

    render(<TaskCard task={task} onEditTask={onEditTask} />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: {
        value: 'done',
      },
    });

    await waitFor(() => {
      expect(updateTask).toHaveBeenCalledWith(1, {
        status: 'done',
      });
    });
  });

  it('supprime la tâche lorsque l’utilisateur confirme', async () => {
    window.confirm.mockReturnValue(true);
    deleteTask.mockResolvedValueOnce();

    render(<TaskCard task={task} onEditTask={onEditTask} />);

    fireEvent.click(screen.getByTitle('Supprimer'));

    expect(window.confirm).toHaveBeenCalledWith(
      'Êtes-vous sûr de vouloir supprimer cette tâche ?'
    );

    await waitFor(() => {
      expect(deleteTask).toHaveBeenCalledTimes(1);
    });

    expect(deleteTask).toHaveBeenCalledWith(1);
  });

  it('ne supprime pas la tâche lorsque l’utilisateur annule', async () => {
    window.confirm.mockReturnValue(false);

    render(<TaskCard task={task} onEditTask={onEditTask} />);

    fireEvent.click(screen.getByTitle('Supprimer'));

    expect(window.confirm).toHaveBeenCalledWith(
      'Êtes-vous sûr de vouloir supprimer cette tâche ?'
    );

    expect(deleteTask).not.toHaveBeenCalled();
  });

  it('applique la classe correspondant à la priorité', () => {
    const { container } = render(
      <TaskCard task={task} onEditTask={onEditTask} />
    );

    expect(container.firstChild).toHaveClass('task-card');
    expect(container.firstChild).toHaveClass('priority-high');
  });

  it('affiche la date de création', () => {
    render(<TaskCard task={task} onEditTask={onEditTask} />);

    expect(screen.getByText(/Créé:/)).toBeInTheDocument();
  });
});