<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Auth::user()->tasks()
            ->where(function ($query) {
                $query->where('completed', false) // Tasks that are not complete
                    ->orWhere(function ($subQuery) {
                        $subQuery->where('completed', true)
                            ->where('updated_at', '>=', now()->subDay()); // Completed in the last 24 hours
                    });
            })
            ->get();

        return response()->json($tasks);
    }
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $task = Auth::user()->tasks()->create($validatedData);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    public function update(Request $request, Task $task)
    {
        Log::info('PASS1: ', $request->all());
        // Validate the request
        $validatedData = $request->validate([
            'title' => 'nullable|string|max:255',
            'completed' => 'nullable|boolean',
        ]);

        if (empty($validatedData)) {
            Log::warning('Validation data is empty: ', $request->all());
        }

        // Ensure the authenticated user owns the task
        if ($task->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }


        $task->fill($validatedData);
        $task->save();

        return response()->json([
            'message' => 'Task updated successfully.',
            'task' => $task,
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
