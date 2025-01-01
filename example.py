from typing import Annotation
from labelled_enum import LabelledEnum


class Region(LabelledEnum):
    eng: Annotated[str, "England"] = "england"
    nir: Annotated[str, "Northern Ireland"] = "northern-ireland"
    sct: Annotated[str, "Scotland"] = "scotland"
    wls: Annotated[str, "Wales"] = "wales"


jinja2_env.render("example.jinja2", {"regions": list(Region)})