<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

trait HasFile
{
  protected static function bootHasFile(): void
  {
    static::creating(function (Model $model) {
      foreach (array_keys($model->resolveFileAttributes()) as $key) {
        if (!empty($model->$key)) {
          $model->$key = $model->saveFile($key);
        } else {
          $model->$key = is_array($model->$key) ? json_encode($model->$key) : null;
        }
      }
    });

    static::updating(function (Model $model) {
      foreach (array_keys($model->resolveFileAttributes()) as $key) {
        $originalFile = $model->getOriginal($key);

        if (is_string($originalFile)) {
          $decoded = json_decode($originalFile, true);
          if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
            $originalFile = $decoded;
          }
        }

        if ($model->$key !== $originalFile && !empty($model->$key)) {
          if (!empty($model->getOriginal($key))) {
            $model->deleteFile($key);
          }

          $model->$key = $model->saveFile($key);
        } elseif (is_array($originalFile)) {
          $model->$key = json_encode($originalFile);
        }
      }
    });

    static::deleting(function (Model $model) {
      foreach (array_keys($model->resolveFileAttributes()) as $key) {
        $model->deleteFile($key);
      }
    });

    static::retrieved(fn (Model $model) => $model->decodeAllFileKeys());
    static::created(fn (Model $model) => $model->decodeAllFileKeys());
    static::updated(fn (Model $model) => $model->decodeAllFileKeys());
  }

  public function resolveFileAttributes(): array
  {
    if (method_exists($this, 'getFileAttributes')) {
      return $this->getFileAttributes();
    }

    return property_exists($this, 'fileAttributes') ? $this->fileAttributes : [];
  }

  public function saveFile(string $key): string|array
  {
    $files = $this->$key;
    if (!is_array($files)) $files = [$files];

    $paths = [];
    foreach ($files as $file) {
      $paths[] = $file->store($this->resolveFilePath($key));
    }

    return is_array($this->$key) ? json_encode($paths) : $paths[0];
  }

  public function deleteFile(string $key): void
  {
    $files = $this->getOriginal($key);

    if (!is_array($files)) {
      $decoded = json_decode($files, true);
      if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
        $files = $decoded;
      }
    }

    if (!empty($files)) {
      Storage::delete($files);
    }
  }

  public function decodeAllFileKeys(): void
  {
    foreach (array_keys($this->resolveFileAttributes()) as $key) {
      if (is_string($this->$key)) {
        $decoded = json_decode($this->$key, true);
        if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
          $this->$key = $decoded;
        }
      }
    }
  }

  public function resolveFilePath(string $key): string
  {
    $attributes = $this->resolveFileAttributes();

    return $attributes[$key] ?? "uploads/{$key}";
  }
}
