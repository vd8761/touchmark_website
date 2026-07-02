export interface EbookSubmissionData {
  ebook_content_id: string;
  ebook_name: string;
  ebook_lname: string;
  ebook_email: string;
  ebook_comname: string;
  'g-token'?: string;
}

/**
 * Submits the e-book contact form to the legacy PHP backend endpoint.
 */
export async function submitEbookForm(data: EbookSubmissionData): Promise<{ success: boolean; message?: string }> {
  // Convert object to url-encoded body for PHP backend compatibility
  const formBody = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      formBody.append(key, value);
    }
  });

  const response = await fetch('/head/engine/ajax/__ajax_ebook_form.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: formBody.toString(),
  });

  if (!response.ok) {
    throw new Error(`Server returned error status: ${response.status}`);
  }

  // Legacy AJAX endpoints typically return HTML/text or JSON
  const responseText = await response.text();
  
  // Since we check success state by matching div toggling on frontend, we assume HTTP 200 is success.
  // We can try to parse JSON if backend returns it, otherwise return success as true.
  try {
    const json = JSON.parse(responseText);
    return {
      success: json.success !== false,
      message: json.message || '',
    };
  } catch {
    return {
      success: true,
      message: responseText,
    };
  }
}
