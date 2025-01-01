import inspect
from enum import StrEnum
from typing import Annotated, get_args


class LabelledEnum(StrEnum):
    def __str__(self) -> str:
        annotations = inspect.get_annotations(self.__class__)

        if self.name in annotations:
            args = get_args(annotations[self.name])
            if args and len(args) == 2:
                return args[1]

        return str(self.value)