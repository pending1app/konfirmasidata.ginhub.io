{% for region in regions|sort %}
<label><input type="radio" name="region" value="{{ region.value }}" required> {{ region }}</label>
{% endfor %}