from typing import Annotated

from labelled_enum import LabelledEnum


def test_labelled_enum():
    class TestEnum(LabelledEnum):
        my_foo: Annotated[str, "Foo"] = "foo"
        my_bar: str = "bar"
        my_baz = "baz"

    assert TestEnum.my_foo.name == "my_foo"
    assert str(TestEnum.my_foo) == "Foo"
    assert TestEnum.my_foo.value == "foo"

    assert TestEnum.my_bar.name == "my_bar"
    assert str(TestEnum.my_bar) == "bar"
    assert TestEnum.my_bar.value == "bar"

    assert TestEnum.my_baz.name == "my_baz"
    assert str(TestEnum.my_baz) == "baz"
    assert TestEnum.my_baz.value == "baz"
